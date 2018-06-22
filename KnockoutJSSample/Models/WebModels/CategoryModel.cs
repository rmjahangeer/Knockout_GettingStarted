using System.Collections.Generic;

namespace Models.WebModels
{
    public class CategoryModel
    {
        public CategoryModel()
        {
            Children = new List<CategoryModel>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string ParentCategory { get; set; }
        public string Image { get; set; }
        public int? ParentId { get; set; }
        public List<CategoryModel> Children { get; set; }
        //public CategoryModel ParentCategory { get; set; }

    }
}
