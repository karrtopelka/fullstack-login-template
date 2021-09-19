const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../s3');
const { v4: uuidv4 } = require('uuid');

const router = new Router();

router.patch('/update', async (req, res) => {
  try {
    const { id, name, lastName, avatar, age, country, region, socials } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: id },
      { name, lastName, avatar, age, country, region, socials },
      { new: true },
    );

    return res.json({
      user,
      message: 'Successfully updated',
    });
  } catch (err) {
    console.warn(err);
    res.status(400).json({
      message: 'Error while update',
    });
  }
});

router.patch('/private-update', async (req, res) => {
  try {
    const { id, email, password } = req.body;

    const actual = await User.findOne({ _id: id });
    const candidate = await User.findOne({ email });

    if (actual.email !== candidate?.email && candidate) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 8);
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        email,
        password: hashedPassword,
      },
      { new: true },
    );

    return res.json({
      user,
      message: 'Successfully updated',
    });
  } catch (err) {
    console.warn(err);
    res.status(400).json({
      message: 'Error while update',
    });
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_AVATARS_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${uuidv4()}`);
    },
  }),
});

router.post('/avatar', upload.single('avatar'), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    if (user.avatar) {
      const filename = user.avatar.split('/').pop();
      if (filename) {
        s3.deleteObject({ Bucket: process.env.AWS_AVATARS_BUCKET, Key: filename }, (err, data) => {
          if (err) {
            throw new Error(err);
          }
        }).promise();
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { avatar: req.file.location },
      { new: true },
    );

    return res.json({
      user: updatedUser,
      message: 'Successfully updated',
    });
  } catch (err) {
    console.warn(err);
    res.status(400).json({
      err,
      message: 'Error while uploading file',
    });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId: id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      user,
      message: 'Success',
    });
  } catch (err) {
    console.warn(err);
    res.status(400).json({
      message: 'Error while fetching',
    });
  }
});

module.exports = router;
