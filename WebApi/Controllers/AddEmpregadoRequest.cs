namespace WebApi.Controllers
{
    public record AddEmpregadoRequest(string FirstName, string LastName, string Email,
        string Cpf, string DateOfBirth, string Address);

}
