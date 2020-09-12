using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoginAuthenticationProject.Models
{
    public class UserModel
    {
        private int _id;
        private string _username;
        private string _password;
        private string _image;
        private string _name;
        private DateTime _createdat;
        private DateTime _updatedat;

        public string Username { get => _username; set => _username = value; }
        public string Password { get => _password; set => _password = value; }
        public string Image { get => _image; set => _image = value; }
        public string Name { get => _name; set => _name = value; }
        public DateTime CreatedAt { get => _createdat; set => _createdat = value; }
        public DateTime UpdatedAt { get => _updatedat; set => _updatedat = value; }
        public int Id { get => _id; set => _id = value; }
    }
}
