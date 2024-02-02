import PositionModel from '../models/position';
import RoleModel from '../models/role';
import UserModel from '../models/user'; // Đảm bảo rằng bạn đã đặt đúng đường dẫn đến model User

export const getOne = async (id) => {
  try {
    const response = await UserModel.findById(id).select('-password').lean();
    return {
      err: response ? 0 : 1,
      msg: response ? 'oke' : 'fail to get user',
      response
    };
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (ids) => {
  try {
    const response = await UserModel.deleteMany({ _id: { $in: ids } });
    return {
      err: response.deletedCount > 0 ? 0 : 1,
      msg: response.deletedCount + ' user(s) deleted'
    };
  } catch (error) {
    throw error;
  }
};

export const updateUserAdmin = async (id, data) => {
  try {
    const response = await UserModel.updateOne({ _id: id }, data);
    return {
      err: response.nModified > 0 ? 0 : 1,
      msg: response.nModified + ' user(s) updated'
    };
  } catch (error) {
    throw error;
  }
};

export const getUsers = async ({ page, limit, order, ...query }) => {
    try {
        const offset = (!page || +page <= 1) ? 0 : (+page - 1);
        const fLimit = limit || process.env.LIMIT;
        
        const response = await UserModel.find(query)
            .skip(offset * +fLimit)
            .limit(+fLimit)
            .select('-password')
            .populate({
                path: 'positionData',
                model: PositionModel,
                select: 'code value'
            })
            .populate({
                path: 'roleData',
                model: RoleModel,
                select: 'code value'
            })
            .lean();

        return {
            err: response ? 0 : 1,
            msg: response ? 'oke' : 'fail to get all user',
            response
        };
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (payload, id) => {
    try {
      const response = await UserModel.updateOne({ _id: id }, payload);
      return {
        err: response.modifiedCount > 0 ? 0 : 1,
        msg: response.modifiedCount > 0 ? 'update user oke !' : 'fail to update user',
        response
      };
    } catch (error) {
      throw error;
    }
  };

const hashPassword = password => {
  return bcryptjs.hashSync(password, bcryptjs.genSaltSync(12));
};

export const updatePasswordUser = async ({ oldPassword, newPassword }, id) => {
  try {
    const response = await UserModel.findById(id).select('password').lean();
    const isCorrectPassword = response && bcryptjs.compareSync(oldPassword, response.password);

    if (isCorrectPassword) {
      await UserModel.updateOne({ _id: id }, { password: hashPassword(newPassword) });
      return {
        err: 0,
        msg: 'update user oke !'
      };
    } else {
      return {
        err: 1,
        msg: 'update password user fail !'
      };
    }
  } catch (error) {
    throw error;
  }
};

export const getUserByPhone = async ({ phone }) => {
  try {
    const response = await UserModel.findOne({ phone }).select('-password -roleCode -positionCode').lean();
    return {
      err: response ? 0 : 1,
      msg: response ? 'oke' : 'fail to get user',
      response
    };
  } catch (error) {
    throw error;
  }
};

export const createPasswordUser = async ({ phone, password }) => {
  try {
    await UserModel.updateOne({ phone }, { password: hashPassword(password) });
    return {
      err: 0,
      msg: 'update user oke !',
    };
  } catch (error) {
    throw error;
  }
};
