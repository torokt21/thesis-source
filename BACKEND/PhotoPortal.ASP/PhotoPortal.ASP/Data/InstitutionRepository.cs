using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Data
{
    public class InstitutionRepository : GenericRepository<Institution>, IInstitutionRepository
    {
        public InstitutionRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override void Insert(Institution obj)
        {
            base.Insert(obj);

            this._context.Products.ToList().ForEach(product =>
            {
                obj.OrderableProducts.Add(product);
            });

            this.Save();
        }
    }
}
