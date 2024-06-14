using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Entities;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmpregadoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmpregadoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddEmpregadoRequest request)
        {
            var verifarEmpregadoExistente = await _context.Empregados.AnyAsync(empregado => empregado.FirstName == request.FirstName);

            if (!DateTime.TryParse(request.DateOfBirth, null, System.Globalization.DateTimeStyles.RoundtripKind, out DateTime dateOfBirth))
            {
                return BadRequest("Formato de data inválido");
            }

            if (verifarEmpregadoExistente)
            {
                return Conflict("Usuário com esse nome já existe");
            }

            var novoEmpregado = new Empregado()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                CPF = request.Cpf,
                DateOfBirth = dateOfBirth,
                Address = request.Address,
                CurrentlyEmployed = true,
            };

            await _context.Empregados.AddAsync(novoEmpregado);
            await _context.SaveChangesAsync();

            return Ok(novoEmpregado);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var empregados = await _context.Empregados.Where(empregado => empregado.CurrentlyEmployed).ToListAsync();
            return Ok(empregados);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, UpdateEmpregadoRequest request)
        {
            var empregado = await _context.Empregados.SingleOrDefaultAsync(empregado => empregado.Id == id);

            if (empregado == null)
                return NotFound("Empregado não encontrado");

            if (!DateTime.TryParse(request.DateOfBirth, null, System.Globalization.DateTimeStyles.RoundtripKind, out DateTime dateOfBirth))
            {
                return BadRequest("Formato de data inválido");
            }

            empregado.FirstName = request.FirstName;
            empregado.LastName = request.LastName;
            empregado.Email = request.Email;
            empregado.CPF = request.Cpf;
            empregado.DateOfBirth = dateOfBirth;
            empregado.Address = request.Address;

            await _context.SaveChangesAsync();
            return Ok(empregado);
        }

        //[Authorize(Policy = Identity.IdentityData.AdminUserPolicyName)]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var empregado = await _context.Empregados.SingleOrDefaultAsync(empregado => empregado.Id == id);

            if (empregado == null)
                return NotFound("Empregado não encontrado");

            _context.Empregados.Remove(empregado);
            await _context.SaveChangesAsync();

            return Ok(await _context.Empregados.ToListAsync());
        }
    }
}
