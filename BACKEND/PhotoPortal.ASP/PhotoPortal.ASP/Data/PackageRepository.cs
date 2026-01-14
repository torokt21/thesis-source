using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Data
{
    public class PackageRepository : GenericRepository<PackageInformation>, IPackageRepository
    {
        public PackageRepository(ApplicationDbContext context) : base(context)
        {
        }

        public void SetRequirements(PackageInformation package, List<PackageRequirement> requirements)
        {
            // TODO does this work?
            package.Requirements.Clear();

            package.Requirements.AddRange(requirements);
            this.Save();
        }
    }
}
