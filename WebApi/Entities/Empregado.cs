namespace WebApi.Entities
{
    public class Empregado
    {
        public Guid Id { get; init; }
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? CPF { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string? Address { get; set; }

        public bool CurrentlyEmployed { get; set; }
    }
}
