using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Data
{
    public interface IPackageRepository : IRepository<PackageInformation>
    {
        void SetRequirements(PackageInformation package, List<PackageRequirement> requirements);
    }
}
