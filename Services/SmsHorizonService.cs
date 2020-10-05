using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;


namespace LoginAuthenticationProject.Services
{
    public class AuthorizationAttribute : TypeFilterAttribute, IAuthorizationFilter
    {
        public AuthorizationAttribute() : base(typeof(AuthorizationAttribute))
        {
           
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var hasClaim = context.HttpContext.Request.Headers.ContainsKey("Authorization");
            if (!hasClaim)
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
