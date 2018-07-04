using System;
using System.Runtime.CompilerServices;
using log4net;

namespace Logging
{
    public class LogHelper
    {
        //private static ILog _log;
        public static ILog GetLogger([CallerFilePath] string fileName = "")
        {
            var logger = LogManager.GetLogger(fileName);
            return logger;
        }
    }
}
