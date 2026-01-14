using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Data
{
    public class ClassRepository : GenericRepository<Class>, IClassRepository
    {
        public ClassRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
