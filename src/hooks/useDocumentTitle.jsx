import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useDocumentTitle() {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        let title = "WisEnergy Admin";

        if (path === "/") title = "Login | WisEnergy Admin";
        else if (path.startsWith("/dashboard")) title = "Dashboard | WisEnergy Admin";
        else if (path.startsWith("/users")) title = "Manage Users | WisEnergy Admin";
        else if (path.startsWith("/devices")) title = "Devices | WisEnergy Admin";
        else if (path.startsWith("/feedback")) title = "Feedback | WisEnergy Admin";
        else if (path.startsWith("/rates")) title = "Electricity Rates | WisEnergy Admin";
        else if (path.startsWith("/reviews")) title = "User Reviews | WisEnergy Admin";
        else if (path.startsWith("/notifications")) title = "Notifications | WisEnergy Admin";
        else if (path.startsWith("/reports")) title = "Reports | WisEnergy Admin";

        document.title = title;
    }, [location]);
}
