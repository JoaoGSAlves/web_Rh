namespace WebApi.Controllers
{
    public record UpdateEmpregadoRequest(string FirstName, string LastName, string Email,
        string Cpf, string DateOfBirth, string Address);
}
