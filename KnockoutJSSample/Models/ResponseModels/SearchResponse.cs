using System.Collections.Generic;

namespace Models.ResponseModels
{
    public class SearchResponse <T> where T : class 
    {
        public SearchResponse()
        {
            data = new List<T>();
        }

        public IEnumerable<T> data { get; set; }
        public int recordsTotal { get; set; } 
        public int recordsFiltered { get; set; } 
    }
}
