
class UserDto {
  constructor(obj) {
    this.id = obj._id,
      this.fullname = `${obj.first_name} ${obj.last_name}`,
      this.email = obj.email,
      this.role = obj.role
  }
}

export default UserDto