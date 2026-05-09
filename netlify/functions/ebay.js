// netlify/functions/ebay.js
exports.handler = async function () {
    const APP_ID = "KyleRobe-Website-PRD-309adb704-bac68a48";
    const STORE_NAME = "waywardtraderz";

    const url =
        `https://svcs.ebay.com/services/search/FindingService/v1` +
        `?OPERATION-NAME=findItemsIneBayStores` +
        `&SERVICE-VERSION=1.0.0` +
        `&SECURITY-APPNAME=${APP_ID}` +
        `&RESPONSE-DATA-FORMAT=JSON` +
        `&storeName=${encodeURIComponent(STORE_NAME)}` +
        `&paginationInput.entriesPerPage=12`;

    const response = await fetch(url);
    const data = await response.json();

    const items =
        data?.findItemsIneBayStoresResponse?.[0]
            ?.searchResult?.[0]?.item || [];

    const listings = items.map((item) => ({
        id:    item.itemId[0],
        title: item.title[0],
        price: item.sellingStatus[0].currentPrice[0].__value__,
        image: item.galleryURL?.[0] || "",
        url:   item.viewItemURL[0],
    }));

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(listings),
    };
};
