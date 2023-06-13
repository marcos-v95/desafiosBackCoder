
class UserDto {
  constructor(obj) {
    this.id = obj._id,
      this.firstname = obj.first_name,
      this.lastname = obj.last_name,
      this.age = obj.age,
      this.fullname = obj.first_name + obj.last_name
  }
}

export default UserDto