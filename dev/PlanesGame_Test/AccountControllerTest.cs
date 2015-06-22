using Microsoft.VisualStudio.TestTools.UnitTesting;
using PlanesGame.Controllers;
using PlanesGame.Models;
using System.Web.Mvc;

namespace PlanesGame_Test
{
    [TestClass]
    public class AccountControllerTest
    {
        [TestMethod]
        public void Successfull_Login_Redirects_to_HomeController()
        {
            var sut = new AccountController();
            var userCredentials = new Login
            {
                Username = "lucian",
                Password = "tgsnext"
            };
            var actual = (RedirectResult)sut.Login(userCredentials, ".");

            Assert.AreEqual("../home", actual.Url);
        }

        [TestMethod]
        public void Empty_Username_displays_Login_View()
        {
            var sut = new AccountController();
            var userCredentials = new Login
            {
                Username = "",
                Password = "tgsnext"
            };
            sut.ModelState.AddModelError("x", "x");
            var actual = (ViewResult)sut.Login(userCredentials, ".");

            Assert.AreEqual("", actual.ViewName);

        }

        [TestMethod]
        public void Empty_Password_displays_Login_View()
        {
            var sut = new AccountController();
            var userCredentials = new Login
            {
                Username = "lucian",
                Password = ""
            };
            sut.ModelState.AddModelError("x", "x");
            var actual = (ViewResult)sut.Login(userCredentials, ".");

            Assert.AreEqual("", actual.ViewName);

        }
    }
}
