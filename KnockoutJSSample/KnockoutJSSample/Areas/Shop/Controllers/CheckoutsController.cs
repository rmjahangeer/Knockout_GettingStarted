using System;
using System.Linq;
using System.Web.Mvc;
using Braintree;
using KnockoutJSSample.Filter;
using KnockoutJSSample.Models;
using log4net;
using Logging;
using Microsoft.AspNet.Identity;
using Models;
using Newtonsoft.Json;

namespace KnockoutJSSample.Areas.Shop.Controllers
{
    public class CheckoutsController : Controller
    {
        public IBraintreeConfiguration Config = new BraintreeConfiguration();
        private static readonly ILog Log = LogHelper.GetLogger();

        public static readonly TransactionStatus[] TransactionSuccessStatuses = {
                                                                                    TransactionStatus.AUTHORIZED,
                                                                                    TransactionStatus.AUTHORIZING,
                                                                                    TransactionStatus.SETTLED,
                                                                                    TransactionStatus.SETTLING,
                                                                                    TransactionStatus.SETTLEMENT_CONFIRMED,
                                                                                    TransactionStatus.SETTLEMENT_PENDING,
                                                                                    TransactionStatus.SUBMITTED_FOR_SETTLEMENT
                                                                                };

        public ActionResult New()
        {
            var gateway = Config.GetGateway();
            var clientToken = gateway.ClientToken.Generate();
            ViewBag.ClientToken = clientToken;
            return View();
        }

        public ActionResult Create(CheckoutModel model)
        {
            var gateway = Config.GetGateway();
            decimal amount;

            try
            {
                amount = Convert.ToDecimal(model.Amount);
            }
            catch (FormatException e)
            {
                LogHelper.GetLogger().Error("Error: 81503: Amount is an invalid format.", e);
                TempData["Flash"] = "Error: 81503: Amount is an invalid format.";
                return RedirectToAction("New");
            }

            var nonce = model.PaymentMethodNonce;
            var request = new TransactionRequest
            {
                Amount = amount,
                PaymentMethodNonce = nonce,
                Options = new TransactionOptionsRequest
                {
                    SubmitForSettlement = true
                }
            };

            Result<Transaction> result = gateway.Transaction.Sale(request);
            if (result.IsSuccess())
            {
                Transaction transaction = result.Target;
                Log.Error($"Error occured while makeing payment transaction for user : {User.Identity.GetUserName()}", new EshopException(JsonConvert.SerializeObject(transaction)));
                return RedirectToAction("Show", new { id = transaction.Id });
            }
            else if (result.Transaction != null)
            {
                return RedirectToAction("Show", new { id = result.Transaction.Id });
            }
            else
            {
                string errorMessages = "";
                foreach (ValidationError error in result.Errors.DeepAll())
                {
                    errorMessages += "Error: " + (int)error.Code + " - " + error.Message + "\n";
                }
                Log.Error($"Error occured while makeing payment transaction for user : {User.Identity.GetUserName()}", new EshopException(JsonConvert.SerializeObject(errorMessages)));
                TempData["Flash"] = errorMessages;
                return RedirectToAction("New");
            }

        }

        public ActionResult Show(String id)
        {
            var gateway = Config.GetGateway();
            Transaction transaction = gateway.Transaction.Find(id);

            if (TransactionSuccessStatuses.Contains(transaction.Status))
            {
                TempData["header"] = "Sweet Success!";
                TempData["icon"] = "success";
                TempData["message"] = "Your transaction has been successfully processed. See the Braintree API response and try again.";
            }
            else
            {
                TempData["header"] = "Transaction Failed";
                TempData["icon"] = "fail";
                TempData["message"] = "Your transaction has a status of " + transaction.Status + ". See the Braintree API response and try again.";
            }

            ViewBag.Transaction = transaction;
            return View();
        }
    }

    public class CheckoutModel
    {
        public decimal Amount { get; set; }
        public string PaymentMethodNonce { get; set; }
    }
}
