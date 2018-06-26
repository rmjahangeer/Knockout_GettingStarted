using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Models.Mappers;
using Models.RequestModels;
using Models.ResponseModels;
using Models.WebModels;
using Newtonsoft.Json;
using Repository.Repositories;

namespace KnockoutJSSample.Controllers
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {
        private readonly ProductRepository _repository = new ProductRepository();
        // GET api/<controller>
        public async Task<IHttpActionResult> Get()
        {
            var response = await _repository.GetAll();
            var list = response.Select(x => x.Map()).ToList();
            return Ok(list);
        }

        // GET api/product/search
        [Route("search"), HttpGet]
        public async Task<IHttpActionResult> Search([FromUri] ProductSearchRequest searchRequest)
        {
            var response = await _repository.Search(searchRequest);
            var toReturn = new SearchResponse<ProductModel>
            {
                data = response.data.ToList().Select(x => x.Map()).ToList(),
                recordsFiltered = response.recordsFiltered,
                recordsTotal = response.recordsTotal
            };
            return Ok(toReturn);
        }

        // GET api/<controller>/5
        public async Task<IHttpActionResult> Get(int id)
        {

            var response = await _repository.Find(id);
            var product = response?.Map();
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        // POST api/<controller>
        public async Task<IHttpActionResult> Post()
        {
            var provider = await Request.Content.ReadAsMultipartAsync(new InMemoryMultipartFormDataStreamProvider());
            //access form data
            NameValueCollection formData = provider.FormData;
            var files = Convert.ToInt32(formData["FilesCount"]);
            var images = new List<ProductImageModel>();
            for (int i = 2; i <= files; i++)
            {
                images.Add(new ProductImageModel
                {
                    Image = formData[$"FilePath-{i}"]
                });
            }
            var data = formData["data"];
            var model = JsonConvert.DeserializeObject<ProductModel>(data);
            model.Image = formData["FilePath-featureImage"];
            model.ProductImages = images;
            model.CreatedOn = DateTime.UtcNow;
            model.CreatedBy = User.Identity.IsAuthenticated ? User.Identity.GetUserId() : "";
            await _repository.SaveOrUpdate(model.Map());
            return Ok();
        }

        // PUT api/<controller>/5
        public async Task<IHttpActionResult> Put(int id)
        {
            var provider = await Request.Content.ReadAsMultipartAsync(new InMemoryMultipartFormDataStreamProvider());
            //access form data
            NameValueCollection formData = provider.FormData;
            var files = Convert.ToInt32(formData["FilesCount"]);
            var images = new List<ProductImageModel>();
            for (int i = 2; i < files; i++)
            {
                images.Add(new ProductImageModel
                {
                    Image = formData[$"FilePath-{i}"]
                });
            }
            var data = formData["data"];
            var model = JsonConvert.DeserializeObject<ProductModel>(data);
            model.ProductImages = images;
            if (!string.IsNullOrEmpty(formData["FilePath-featureImage"]))
                model.Image = formData["FilePath-featureImage"];
            model.ModifiedOn = DateTime.UtcNow;
            model.ModifiedBy = User.Identity.IsAuthenticated ? User.Identity.GetUserId() : "";
            await _repository.SaveOrUpdate(model.Map());
            return Ok();
        }

        // DELETE api/<controller>/5
        public async Task<IHttpActionResult> Delete(int id)
        {
            var product = await _repository.Delete(id);
            if (product)
                return Ok();
            return NotFound();
        }
    }
}