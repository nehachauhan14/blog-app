using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text;

namespace UnitTests
{
    public abstract class BaseUnitTest
    {
        protected string GenerateRandomString(int stringLength)
        {
            var builder = new StringBuilder();
            var random = new Random(DateTime.Now.Second);
            char ch;
            for (var i = 0; i<stringLength; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            return builder.ToString() + Guid.NewGuid();
        }
        
    }
}
