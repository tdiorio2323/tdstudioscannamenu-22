# Navigation Audit for http://localhost:8082

## Navigation Inventory
| label | path | location | order_index | desktop | mobile | dropdown | external |
|---|---|---|---:|---:|---:|---:|---:|
| TD STUDIOS | / | header | 0 | yes | yes | no | no |
| HOME | / | header | 1 | yes | yes | no | no |
| SHOP | /shop | header | 2 | yes | yes | no | no |
| DIGITAL ASSETS | /digital-assets | header | 3 | yes | yes | no | no |
| REFERRAL | /referral | header | 4 | yes | yes | no | no |
| CONTACT | /contact | header | 5 | yes | yes | no | no |
| WEBSITES | /custom-websites | header | 6 | yes | yes | no | no |
| TD STUDIOS | / | footer | 8 | yes | yes | no | no |
| HOME | / | footer | 9 | yes | yes | no | no |
| SHOP | /shop | footer | 10 | yes | yes | no | no |
| DIGITAL ASSETS | /digital-assets | footer | 11 | yes | yes | no | no |
| REFERRAL | /referral | footer | 12 | yes | yes | no | no |
| MYLAR DESIGNS | /mylar-designs | footer | 13 | yes | yes | no | no |
| CUSTOM DESIGNS | /custom-designs | footer | 14 | yes | yes | no | no |
| CUSTOM MYLAR FORM | /custom-mylar-form | footer | 15 | yes | yes | no | no |
| CUSTOM DESIGN BRIEF | /custom-design-form | footer | 16 | yes | yes | no | no |
| Start Your Project | /contact | footer | 17 | yes | yes | no | no |

## Route Verification
| route | status | final_url | header_present | logo_to_home | duplicate_header | console_errors | notes |
|---|---:|---|---:|---:|---:|---|---|
| / | 200 | http://localhost:8082/ | yes | ok | no |  |  |
| /shop | 200 | http://localhost:8082/shop | yes | ok | no |  |  |
| /checkout | 200 | http://localhost:8082/checkout | yes | ok | no |  |  |
| /mylar-designs | 200 | http://localhost:8082/mylar-designs | yes | ok | no |  |  |
| /custom-designs | 200 | http://localhost:8082/custom-designs | yes | ok | no |  |  |
| /social-content | 200 | http://localhost:8082/social-content | yes | ok | no |  |  |
| /digital-assets | 200 | http://localhost:8082/digital-assets | yes | ok | no |  |  |
| /referral | 200 | http://localhost:8082/referral | yes | ok | no |  |  |
| /contact | 200 | http://localhost:8082/contact | yes | ok | no |  |  |
| /custom-websites | 200 | http://localhost:8082/custom-websites | yes | ok | no |  |  |
| /custom-mylar-form | 200 | http://localhost:8082/custom-mylar-form | yes | ok | no |  |  |
| /custom-design-form | 200 | http://localhost:8082/custom-design-form | yes | ok | no |  |  |

## Mobile Menu Tests
- default_closed: true
- toggles_open: true
- closes_on_selection: true
- closes_on_route_change: true
- body_scroll_locked_when_open: false