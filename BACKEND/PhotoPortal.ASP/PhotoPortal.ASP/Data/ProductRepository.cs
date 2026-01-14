using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Data
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context)
        {
        }

        public void AddToInstitution(Product product, Institution institution)
        {
            institution.OrderableProducts.Add(product);
            this._context.SaveChanges();
        }

        public void DeleteAllFromInstitution(Institution institution)
        {
            var i = this._context.Institutions.Find(institution.Id);
            i.OrderableProducts.Clear();
            this._context.SaveChanges();
        }
    }
}
