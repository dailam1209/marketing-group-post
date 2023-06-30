export function getEducation(id) {
    const arr = [];
    arr[0] = 'Chưa cập nhật';
    arr[1] = 'Trên Đại học';
    arr[2] = 'Đại học';
    arr[3] = 'Cao đẳng';
    arr[4] = 'Trung cấp';
    arr[5] = 'Đào tạo nghề';
    arr[6] = 'Trung học phổ thông';
    arr[7] = 'Trung học cơ sở';
    arr[8] = 'Tiểu học';
    return arr[id] || 'Chưa cập nhật'
}