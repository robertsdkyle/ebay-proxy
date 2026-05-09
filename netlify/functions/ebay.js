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

    // Return the raw eBay response so we can see what's happening
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
};
