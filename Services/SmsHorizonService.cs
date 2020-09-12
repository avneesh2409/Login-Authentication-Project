using System;
using System.IO   ;
using System.Net  ;
using System.Text ;
using Microsoft.Extensions.Configuration;

namespace LoginAuthenticationProject.Services
{
    public class SmsHorizonService
    {
        private readonly IConfiguration _config;

        public SmsHorizonService(IConfiguration config)
        {
            _config = config;
        }
    }
}
