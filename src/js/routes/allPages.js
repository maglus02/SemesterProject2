import { setAuthListener } from "../ui/listeners/auth.js";
import { replaceSignUpButtonWithUsername } from "../api/navContent.js";
import { searchListener } from "../ui/listeners/search.js";

export async function allPages() {
    setAuthListener();

    replaceSignUpButtonWithUsername();

    searchListener();
}