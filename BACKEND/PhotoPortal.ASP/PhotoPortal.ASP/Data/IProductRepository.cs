using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Data
{
    public interface IProductRepository : IRepository<Product>
    {
        void AddToInstitution(Product product, Institution institution);

        void DeleteAllFromInstitution(Institution institution);
    }
}
