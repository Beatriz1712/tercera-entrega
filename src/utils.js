import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = async (user, password) => {
    try {
        return await bcrypt.compare(password, user.password)
    } catch (error)
{
    throw new Error('error al comparar contraseñas');
}
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default __dirname
