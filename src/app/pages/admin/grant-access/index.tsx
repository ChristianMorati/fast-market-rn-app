import React from "react";
import { BasePage } from "../../../components/base-page";
import PurchaseRelease from "../../../components/admin/purchase-release";
import { ViewContainer } from "../../../styled-components/view";
import { globalStyles } from "../../../global-styles";

export default function GrantAccess() {

    return (
        <BasePage children={
            <>
                <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden, {
                    marginTop: 8,
                    gap: 8,
                }]}>
                    <PurchaseRelease />
                </ViewContainer>
            </>
        } />
    );
}