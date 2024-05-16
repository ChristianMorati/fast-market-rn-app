import React, { useEffect } from 'react';

import { BasePage } from '../../components/base-page';
import { Loading } from '../../components/loading';
import { ParagraphBold } from '../../styled-components/text';
import { Purchase } from '../../components/home/purchase';
import { ViewContainer } from '../../styled-components/view';
import { globalStyles } from '../../global-styles';
import { loadAllPurchasesAsync } from '../../store/purchase/thunks';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../store/hooks/useAppSelector';

function PurchaseHystory() {
    const { loadingAllPurchases, allPurchases } = useAppSelector(store => store.purchase)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadAllPurchasesAsync())
    }, [])
    return (
        <BasePage style={{ paddingTop: 8 }} children={
            <>
                {loadingAllPurchases ? (
                    <Loading />
                ) : (
                    <>
                        {allPurchases.map((purchase: any, index: number) => {
                            return (
                                <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden]} key={index}>
                                    <Purchase title={<ParagraphBold>Data de aquisição:</ParagraphBold>} data={purchase} date={purchase.createdAt} />
                                </ViewContainer>
                            )
                        })}
                    </>
                )}
            </>
        } />
    );
}
export default PurchaseHystory;
