export default class Utils {
    public static doSomething(val: string): void {
        console.log(val);
    }

    public static cutSlug(str: string, iWord: string) {
        var subEnd = str.substring(str.lastIndexOf(iWord), str.length);
        var slugArray = subEnd.split(".", 2); 
        if (slugArray && slugArray.length == 2 && slugArray[0] == iWord && slugArray[1]){
            return slugArray;
        }
        return null;
    }

    public static slugify(str: any): string {
    //     // Chuyển hết sang chữ thường
    // str = str.toLowerCase();     
 
    // // xóa dấu
    // str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    // str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    // str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    // str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    // str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    // str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    // str = str.replace(/(đ)/g, 'd');
 
    // // Xóa ký tự đặc biệt
    // str = str.replace(/([^0-9a-z-\s])/g, '');
 
    // // Xóa khoảng trắng thay bằng ký tự -
    // str = str.replace(/(\s+)/g, '-');
 
    // // xóa phần dự - ở đầu
    // str = str.replace(/^-+/g, '');
 
    // // xóa phần dư - ở cuối
    // str = str.replace(/-+$/g, '');
 
    // // return
    // return str;

        return str.toLowerCase()
        .replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
        .replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
        .replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
        .replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
        .replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
        .replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
        .replace(/(đ)/g, 'd')
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }
}