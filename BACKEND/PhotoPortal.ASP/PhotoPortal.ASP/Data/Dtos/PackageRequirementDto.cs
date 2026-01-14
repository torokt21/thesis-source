namespace PhotoPortal.ASP.Data.Dtos
{
    public class PackageRequirementDto
    {
        public RequirementDto[] Requirements { get; set; }
    }

    public class RequirementDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
