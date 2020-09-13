using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoginAuthenticationProject.Models
{
    public interface IUserModel
    {
        UserModel AddUsers(UserModel user);
        UserModel GetSingleUser(string email, string password);
        List<UserModel> GetUsers();
        string GetUserByNumber(string number);
        void UpdateOtp(string number, string msgId);
        UserViewModel GetUserByMsgId(string msgId);
    }
}
