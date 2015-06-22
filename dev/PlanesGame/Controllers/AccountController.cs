using PlanesGame.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PlanesGame.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account/
        public ActionResult Index()
        {
            return View("Home");
        }

        [HttpPost]
        public ActionResult Login(Login model, string returnUrl)
        {
            //FormsAuthentication.SetAuthCookie(model.Username, false);
            if (ModelState.IsValid)
            { 
                return Redirect("../home");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpGet]
        public ActionResult Login()
        {
            if (ModelState.IsValid)
            {
                //return View("Home");
            }
            // If we got this far, something failed, redisplay form
            return View("Login");
        }

    }
}
