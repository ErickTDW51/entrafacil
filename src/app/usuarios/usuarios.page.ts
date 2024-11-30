import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  users:any[] = [];
  inputVisible: string | null = null;

  constructor() { }

  ngOnInit() {
    this.users = [
      {
        id: '1',
        nombre: 'Juan',
        apellido: 'Pérez',
        tarjeta:[
          5621718181,

        ],
        correo: 'juan.perez@example.com',
        photoUrl: ''
      }
    ];
  }
  // Función para agregar tarjeta a un usuario
  agregarTarjeta(userId: string, nuevaTarjeta: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      if (user.tarjeta.length < 3) {
        user.tarjeta.push(nuevaTarjeta); // Si el usuario tiene menos de 3 tarjetas, se agrega la nueva tarjeta
        alert('Se agrego exitosamente.')
      } else {
        alert('Solo puedes tener un máximo de 3 tarjetas');
      }
    }
  }
  // Función para eliminar la tarjeta
  eliminarTarjeta(userId: any, index: number): void {
    // Encontrar el usuario por su id
    const user = this.users.find(u => u.id === userId);
    
    if (user) {
      // Eliminar la tarjeta del array de tarjetas
      user.tarjeta.splice(index, 1);
      alert('Se elimino la tarjeta exitosamente')
    }
    else{
      alert('No se pudo eliminar la tarjeta')
    }
    
  }
  // Función para eliminar un usuario por su id
  EliminarUsuario(userId: string) {
    this.users = this.users.filter(user => user.id !== userId);
    alert('Usuario eliminado exitosamente')
  }

}
