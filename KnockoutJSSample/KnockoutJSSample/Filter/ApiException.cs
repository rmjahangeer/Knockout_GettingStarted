using System;
using System.Net.Http;
using System.Web.Http.Filters;
using log4net;
using Logging;
using Microsoft.Owin.Logging;
using Newtonsoft.Json;

namespace KnockoutJSSample.Filter
{
    /// <summary>
    /// Api Exception filter attribute for Api controller methods
    /// </summary>
    public class ApiException : ActionFilterAttribute
    {
        #region Private

        /// <summary>
        /// Get Configured logger
        /// </summary>
        // ReSharper disable InconsistentNaming
        private static readonly ILog Logger = LogHelper.GetLogger();
        private void SetApplicationResponse(HttpActionExecutedContext filterContext)
        {
            ExceptionContent contents = new ExceptionContent
            {
                Message = filterContext.Exception.Message
            };
            filterContext.Response = new HttpResponseMessage
            {
                StatusCode = System.Net.HttpStatusCode.BadRequest,
                Content = new StringContent(JsonConvert.SerializeObject(contents))
            };
        }
        /// <summary>
        /// Set General Exception
        /// </summary>
        private void SetGeneralExceptionApplicationResponse(HttpActionExecutedContext filterContext)
        {
            ExceptionContent contents = new ExceptionContent
            {
                Message = string.IsNullOrEmpty(filterContext.Exception.Message) ? "Error occured" : filterContext.Exception.Message
            };
            filterContext.Response = new HttpResponseMessage
            {
                StatusCode = System.Net.HttpStatusCode.BadRequest,
                Content = new StringContent(JsonConvert.SerializeObject(contents))
            };
        }
        #endregion
        #region Public
        /// <summary>
        /// Exception Handler for api calls; apply this attribute for all the Api calls
        /// </summary>
        public override void OnActionExecuted(HttpActionExecutedContext filterContext)
        {
            if (filterContext.Exception == null)
            {
                return;
            }
            Logger.Error($"Web Api Exception : {filterContext.Exception.Message}", filterContext.Exception);
            if (filterContext.Exception is EshopException)
            {
                SetApplicationResponse(filterContext);
            }
            else
            {
                SetGeneralExceptionApplicationResponse(filterContext);
            }
        }

        #endregion
    }

    /// <summary>
    /// Exception Contents
    /// </summary>
    public sealed class ExceptionContent
    {
        /// <summary>
        /// Error message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// IST Exception Type
        /// </summary>
        public string ExceptionType => ExceptionTypes.GeneralException;
    }

    /// <summary>
    /// Cares Exception
    /// </summary>
    public sealed class EshopException : ApplicationException
    {
        /// <summary>
        /// Initializes a new instance of FRS Exception
        /// </summary>
        public EshopException(string message) : base(message)
        {
        }
        /// <summary>
        /// Initializes a new instance of FRS Exception
        /// </summary>
        public EshopException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }

    /// <summary>
    /// Exception Types
    /// </summary>
    public class ExceptionTypes
    {
        /// <summary>
        /// IST General Exception
        /// </summary>
        public static string GeneralException = "GeneralException";
    }
}