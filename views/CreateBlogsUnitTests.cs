using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BloggerApp.Controllers;
using System.Net.Http;
using System.Web;
using BloggerApp.Controllers;
using BlogsDataAccess;
using System.Threading.Tasks;

namespace UnitTests
{
    [TestClass]
    public class CreateBlogsUnitTests : BaseUnitTest
    {
        BlogsController controller;
        //private readonly blogsController = new BloggerApp.Controllers.BlogsController();
        [TestMethod]
        public void TestMethod1()
        {
            controller = new BlogsController();
            var response = controller.GetBlogsList();            
        }

        [TestMethod]
        public Task Ensure_blogsController_can_create_blogs_with_correct_data()
        {
            //Create test data
            var result = controller.CreateBlog(GenerateRandomBlog());

            Assert.AreEqual(isSuccess, result.Success);

            int id = insertBlog.Result;

            //Clean test data
            controller.DeleteBlogById(id);
        }

        #region Model Creator
        private Blog_Detail GenerateRandomBlog()
        {
            return new Blog_Detail
            {
                Title = GenerateRandomString(10),
                Blog_Content = GenerateRandomString(100),
                UID = 1,
                DateOfUpdation = DateTime.Now
            };
        }
        #endregion
    }
}
