import { useEffect } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { setCartPayload } from "./slices/settingsSlice"
import { AppDispatch, AppState } from "./store"

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

// {
//     "token": "2edf345ff6ad6432c9e0bfd1dd5c9618",
//     "note": null,
//     "attributes": {},
//     "original_total_price": 207000,
//     "total_price": 207000,
//     "total_discount": 0,
//     "total_weight": 1200,
//     "item_count": 3,
//     "items": [
//         {
//             "id": 43563922850046,
//             "properties": {},
//             "quantity": 3,
//             "variant_id": 43563922850046,
//             "key": "43563922850046:d4d51aa80c442a33ae655f70d4ecf566",
//             "title": "Short Sleeve T-shirt - S",
//             "price": 69000,
//             "original_price": 69000,
//             "discounted_price": 69000,
//             "line_price": 207000,
//             "original_line_price": 207000,
//             "total_discount": 0,
//             "discounts": [],
//             "sku": "tshirt-1",
//             "grams": 400,
//             "vendor": "Vendor1",
//             "taxable": true,
//             "product_id": 7891017040126,
//             "product_has_only_default_variant": false,
//             "gift_card": false,
//             "final_price": 69000,
//             "final_line_price": 207000,
//             "url": "/products/short-sleeve-t-shirt?variant=43563922850046",
//             "featured_image": {
//                 "aspect_ratio": 1.5,
//                 "alt": "Short Sleeve T-shirt",
//                 "height": 1333,
//                 "url": "https://cdn.shopify.com/s/files/1/0665/7864/5246/products/isolated-black-t-shirt-front_125540-1167.jpg?v=1665115017",
//                 "width": 2000
//             },
//             "image": "https://cdn.shopify.com/s/files/1/0665/7864/5246/products/isolated-black-t-shirt-front_125540-1167.jpg?v=1665115017",
//             "handle": "short-sleeve-t-shirt",
//             "requires_shipping": true,
//             "product_type": "T-Shirt",
//             "product_title": "Short Sleeve T-shirt",
//             "product_description": "New short-sleeved T-shirt for all your T-shirting needs.",
//             "variant_title": "S",
//             "variant_options": [
//                 "S"
//             ],
//             "options_with_values": [
//                 {
//                     "name": "Size",
//                     "value": "S"
//                 }
//             ],
//             "line_level_discount_allocations": [],
//             "line_level_total_discount": 0
//         }
//     ],
//     "requires_shipping": true,
//     "currency": "INR",
//     "items_subtotal_price": 207000,
//     "cart_level_discount_applications": []
// }