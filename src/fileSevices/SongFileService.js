import * as uuid from 'uuid'
import * as path from 'path'

class SongFileService {
  saveSong(file) {
    try {
      const fileType = file.name.split('.').pop()
      const fileName = uuid.v4() + '.' + fileType
      const filePath = path.resolve('music', fileName)
      file.mv(filePath)
      console.log('------------------------------')
      console.log(`\u001b[1;35msaved cover file\u001b[0m`);
      console.log(fileName);
      console.log('------------------------------')
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SongFileService();