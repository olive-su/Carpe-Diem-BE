export function authIsOwner(request, response) {
    if (request.session.is_logined) {
        return true;
    } else {
        return false;
    }
}
