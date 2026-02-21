import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    admin_separator: {
                        table: 'sys_app_module'
                        id: 'f82cfe32350845a9aa4ce45d670e5187'
                    }
                    amenities_module: {
                        table: 'sys_app_module'
                        id: '9a3c3640414048e0b505b2a48ebfa38c'
                    }
                    amenity_1: {
                        table: 'x_466904_recreatio_amenities'
                        id: '7e4adba9cf2f4a0d97fda6a99081ddfc'
                    }
                    amenity_10: {
                        table: 'x_466904_recreatio_amenities'
                        id: '0ff32249cc8b42aca8873d864b8dafde'
                    }
                    amenity_11: {
                        table: 'x_466904_recreatio_amenities'
                        id: '39052dbe65504ecea84e3e189499cd4e'
                    }
                    amenity_12: {
                        table: 'x_466904_recreatio_amenities'
                        id: 'fae0e26a24bf4bc696fb4f797930730d'
                    }
                    amenity_2: {
                        table: 'x_466904_recreatio_amenities'
                        id: 'd5c09b33ca0e4a6b8c9ebb0ae580f4a0'
                    }
                    amenity_3: {
                        table: 'x_466904_recreatio_amenities'
                        id: 'a0bb1b91a8a747abb398edf43928ca1c'
                    }
                    amenity_4: {
                        table: 'x_466904_recreatio_amenities'
                        id: 'b88254a5eab24ad697a7b6f4c177b4de'
                    }
                    amenity_5: {
                        table: 'x_466904_recreatio_amenities'
                        id: 'e618d68b8b78418abade0f27e57b47e7'
                    }
                    amenity_6: {
                        table: 'x_466904_recreatio_amenities'
                        id: 'e8d123f805bf46da89efb479f1eeff33'
                    }
                    amenity_7: {
                        table: 'x_466904_recreatio_amenities'
                        id: 'c666766d84d04026b1e8a859f1440bf0'
                    }
                    amenity_8: {
                        table: 'x_466904_recreatio_amenities'
                        id: '26d424cf706c4dce966f5ae55a9e6c3f'
                    }
                    amenity_9: {
                        table: 'x_466904_recreatio_amenities'
                        id: '206fa1f990ce4f81b526b9731407309d'
                    }
                    api_docs_module: {
                        table: 'sys_app_module'
                        id: '9a9154fd3d6241b49267c2ca4f1154d9'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '4e974bbbd7204527853e2a29bf099b37'
                    }
                    booking_1: {
                        table: 'x_466904_recreatio_booking_slots'
                        id: '7bd2e96e62c94028bb715195b2cc83c9'
                    }
                    booking_2: {
                        table: 'x_466904_recreatio_booking_slots'
                        id: 'ed2473cccaa149d5a15859805897e5eb'
                    }
                    booking_3: {
                        table: 'x_466904_recreatio_booking_slots'
                        id: 'b2612553ab9241ff98a1a6cfd0c5a201'
                    }
                    booking_4: {
                        table: 'x_466904_recreatio_booking_slots'
                        id: 'b26a4f6e7a1c4f0ebd8a3f79da46e644'
                    }
                    booking_5: {
                        table: 'x_466904_recreatio_booking_slots'
                        id: '7882140725c545e8901eee9560d174aa'
                    }
                    booking_6: {
                        table: 'x_466904_recreatio_booking_slots'
                        id: '5dba3b5ddce84c059c7a2c54d2c800d4'
                    }
                    booking_portal_module: {
                        table: 'sys_app_module'
                        id: '5b40333b07664b3eb051998f2a10f13c'
                    }
                    booking_slot_param: {
                        table: 'sys_ws_query_parameter'
                        id: '5b10f777790a49d9a4d9415bb9217570'
                    }
                    booking_slots_api: {
                        table: 'sys_ws_definition'
                        id: 'cfee15a2e9934f44ad65bb51f6f62b5e'
                    }
                    booking_slots_module: {
                        table: 'sys_app_module'
                        id: '5cd5b2f040154ad3afe83c3cf69c81b3'
                    }
                    booking_slots_route: {
                        table: 'sys_ws_operation'
                        id: '9f319d675ef2436f9b0f26547fb9ab9d'
                    }
                    booking_v1: {
                        table: 'sys_ws_version'
                        id: 'bc205caaa19e47608dedfc41fb1f985c'
                    }
                    br_booking_notification: {
                        table: 'sys_script'
                        id: '205b389a804b4a2aa56a35fb92ceb35a'
                    }
                    comment_type_param: {
                        table: 'sys_ws_query_parameter'
                        id: 'c468bdef4dfc4b2ba322286dd3ba8d3d'
                    }
                    comments_api: {
                        table: 'sys_ws_definition'
                        id: '1875c60c11234987bb9dbda48d3d62e2'
                    }
                    comments_module: {
                        table: 'sys_app_module'
                        id: 'df856d7c8f3041c592e0ce526e2b6045'
                    }
                    comments_page_param: {
                        table: 'sys_ws_query_parameter'
                        id: '1bd4a04623e7497e9e6c983de94d3ae1'
                    }
                    comments_pagesize_param: {
                        table: 'sys_ws_query_parameter'
                        id: '2882efaac68f48d48094f986c5040beb'
                    }
                    comments_route: {
                        table: 'sys_ws_operation'
                        id: 'b66867a44ee2421096019ea9cef10e02'
                    }
                    comments_v1: {
                        table: 'sys_ws_version'
                        id: 'fbb2212b79414bc4a0b39dbeb150db32'
                    }
                    create_booking_route: {
                        table: 'sys_ws_operation'
                        id: '3002e18ffa754e38933f0615d5d094ab'
                    }
                    create_comment_route: {
                        table: 'sys_ws_operation'
                        id: 'cea2bbe9e1094199ad5019683448bb09'
                    }
                    is_public_param: {
                        table: 'sys_ws_query_parameter'
                        id: '30e0e99beb8647578cd25cdc0e7a8607'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'cdb49def0faa4b5dbc52fe90bf6eaa3d'
                    }
                    page_param: {
                        table: 'sys_ws_query_parameter'
                        id: '42574abf8e3843cd9006adf3c4f63e56'
                    }
                    pagesize_param: {
                        table: 'sys_ws_query_parameter'
                        id: '09b83fb17ec84070865a8d2bbab1cf87'
                    }
                    portal_separator: {
                        table: 'sys_app_module'
                        id: '4441e46790a54c8a8c57c4ae686fa05a'
                    }
                    recreational_booking_portal: {
                        table: 'sys_ui_page'
                        id: '04eae8577864479ebfa31b163a97ddca'
                    }
                    recreational_facility_menu: {
                        table: 'sys_app_application'
                        id: '7f645bf797d84688b0a36e50d86485b6'
                    }
                    source_param: {
                        table: 'sys_ws_query_parameter'
                        id: 'ade3a091a0124e8892974385a0612693'
                    }
                    'src_server_api-handlers_booking-api_js': {
                        table: 'sys_module'
                        id: 'a00b10975f8a424fac331b0d9c690e59'
                    }
                    'src_server_api-handlers_comments-api_js': {
                        table: 'sys_module'
                        id: 'cf3500c6246b4748a37bc378b84580da'
                    }
                    'src_server_business-rules_booking-notification-handler_js': {
                        table: 'sys_module'
                        id: 'e7abebb1a55f443688a0cc0c140caf61'
                    }
                    'src_server_data-generator_js': {
                        table: 'sys_module'
                        id: '46965ffa6c5c48a3a5be830586fee032'
                    }
                    'src_server_script-includes_booking-notification-handler_js': {
                        table: 'sys_module'
                        id: '63719d21aa564eb08dfe5db09f0bd904'
                    }
                    'src_server_ui-actions_configure-notifications_js': {
                        table: 'sys_module'
                        id: 'c9148fbe99bb4fe5984ef7be5ac3ce01'
                    }
                    'src_server_ui-actions_test-all-notifications_js': {
                        table: 'sys_module'
                        id: 'e5b54ebfcd504b5fadd48f637042317f'
                    }
                    staff_1: {
                        table: 'x_466904_recreatio_staff'
                        id: 'f2f87a40760b41bfb40f07ca8dcc8adb'
                    }
                    staff_2: {
                        table: 'x_466904_recreatio_staff'
                        id: 'b7f9d217ed5b4d21a36e56fb900a3a72'
                    }
                    staff_3: {
                        table: 'x_466904_recreatio_staff'
                        id: 'd3925f5b5c6549d59b070c90270892e1'
                    }
                    staff_4: {
                        table: 'x_466904_recreatio_staff'
                        id: '542f376ff0a444749c0c657251914a62'
                    }
                    staff_5: {
                        table: 'x_466904_recreatio_staff'
                        id: '4a0a167996974e2db00cb62afab36538'
                    }
                    staff_6: {
                        table: 'x_466904_recreatio_staff'
                        id: '5d3ba0f0090b4ddfb87a342150a9a8af'
                    }
                    staff_7: {
                        table: 'x_466904_recreatio_staff'
                        id: '8b2a855fa9b94cb38e910976c369a190'
                    }
                    staff_8: {
                        table: 'x_466904_recreatio_staff'
                        id: '68dc76b3f064466d999a6392ab685aaf'
                    }
                    staff_module: {
                        table: 'sys_app_module'
                        id: '9ffa08274a4645909dc966d5a3be2d06'
                    }
                    status_param: {
                        table: 'sys_ws_query_parameter'
                        id: '1c90fd604d5540ee86ab133de0c065d6'
                    }
                    test_data_generator: {
                        table: 'sys_scheduled_script'
                        id: 'f0f13754ab2443aa878dc8630ca152ff'
                    }
                    test_data_module: {
                        table: 'sys_app_module'
                        id: '20b525fec5eb41a6a65a041520ca1af9'
                    }
                    'x_466904_recreatio/main': {
                        table: 'sys_ux_lib_asset'
                        id: '0fd4075cf6394e1ebeaf7ffa20cb5571'
                    }
                    'x_466904_recreatio/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: 'ade621de78364b8cae80be6adffed5f6'
                    }
                }
                composite: [
                    {
                        table: 'sys_choice'
                        id: '0040662601dc4e17959393fb61015d8a'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'position'
                            value: 'manager'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0131275a04bb451f84d4c8722ec4ec8a'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '024450c19731436eb72bd64b03739375'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'hire_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '040290c7263b4340a84241cba7b1d1a9'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'comment_text'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '044f0ce90cf0444b989a565740dfc6d2'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'additional_comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '08c60ce2ac6c4e36bf2454cda0fd6abd'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'comment_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0e15e2a4e80d452480595bf04e091ab0'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'comment_type'
                            value: 'maintenance_issue'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '16bf1381a9334d5e84f51cac044c8af6'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'comment_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1a87a215be15491bb3d4795997a6bc1f'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1b334d2a80b54671971f01de26e86604'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1bc744487df745a096bbbcb89b2bb317'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'comment_type'
                            value: 'special_request'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d50de77e3e7444a8c6ead4283e08117'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'amenity_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1f9d1eeeb1114c0cae566b30b050af9b'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2057b1b1621a43d794da4bbf76aa192b'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'author_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '20c3fb18f12547f7acab46675db789e8'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'booking_slot'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2116ccfa174b47ee98213479f58ed3f8'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_type'
                            value: 'individual_amenity'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '22968f93bbd741be8e1578f903315646'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2399151426c2412ba58a163184c258d8'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booked_by_staff'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2538d892a34240e1a7e27f2d83c1ad9b'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'shift_end'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2b7749eb68bd4e569477722426570786'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'is_active'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2d61ed5c095a40eb81575b5dbd494537'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '306e4a36d8904221a5e46150fc177929'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'customer_phone'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '32f4c45312004a01bd0da6cc9f840107'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_type'
                            value: 'entire_arena'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '338445e59dff4125a25a6da3f09630c3'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'customer_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '338f3806c8b042e59b65f39b9d81973d'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'amenity_type'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '33fdb3e97fa047cfa52eb89c85cbda2c'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'amenity_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3655eaaa3b2840ecbad2489a9f7f8ecc'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'emergency_contact_phone'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '38024792e8ce46eaae2203d11ad22209'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'position'
                            value: 'supervisor'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '39ecc6d8b00a490cb6d7f2e803802f0b'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'is_active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '41afb45420644aa49115033e83c8f34e'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'department'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '45268f8971ae4a158b8d938548f8031d'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '45edcd945c12490398965e2fde454562'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '46262dd811994df28cde5268b23851c2'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'shift_start'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '48a7d2eba55941c4b887b06776773bc6'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'source'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4a308c872e194d9f837ec8317094b5e2'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4b8d16ad1050494082fc463656ecef0d'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'department'
                            value: 'operations'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '4ba7ae6f941e47adb980b43fa2b237a5'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4c0eb076c4ee498a9acfc39879ed5f35'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'shift_end'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4d1d733a37ac4ce38aaf225b9e6a0603'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4e450a8d0b4c407c8cb23a9342248bcc'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'maintenance_notes'
                        }
                    },
                    {
                        table: 'sys_ws_query_parameter_map'
                        id: '4ecff15453a348eda5ee52e8638458c2'
                        key: {
                            web_service_operation: '9f319d675ef2436f9b0f26547fb9ab9d'
                            web_service_query_parameter: '09b83fb17ec84070865a8d2bbab1cf87'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5271f50837c1463c98fa30bfe18c67c4'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ws_query_parameter_map'
                        id: '546ce6cb7ca54b2bb66c9716e16ea1c8'
                        key: {
                            web_service_operation: 'b66867a44ee2421096019ea9cef10e02'
                            web_service_query_parameter: 'c468bdef4dfc4b2ba322286dd3ba8d3d'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '560c2baa555c48459a9eda5b3f4e7b35'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'start_time'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '565960d9d0354d349ff945b8225ff7e1'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'position'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '56890ec262dc4ff4a6326ca1f81fd6a7'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'payment_status'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '56b845ab45a74b2188a768c86bb307ea'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '591850404dfb455581dadcb245bcbe7b'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'staff_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5a0bcd06d2554d59b9674812ee385076'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'comment_text'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5b072c57ebad407e9bec2242f42f1627'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '5e0d8d3b4e664efda66c79754202d2e1'
                        key: {
                            name: 'x_466904_recreatio_staff'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '62ebb442206c4212bcdca7f5d6441e03'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'amenity_type'
                            value: 'swimming_pool'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '659a88a027794a01a46b9cfa8fd4084b'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'amenity_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '6605f93969a343faa96507e183de59d0'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6675d1cdbcf04a8ca59b52ce22c621a0'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'payment_status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '669e22884aad415db3b1a9251a72178d'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'total_cost'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6851d3b5d84149b4a4dd405d2745b77a'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '696283409ca94ca487ee63f11ecc80ec'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'comment_type'
                            value: 'staff_note'
                        }
                    },
                    {
                        table: 'sys_ws_query_parameter_map'
                        id: '69e1f2b2025043089b99beb954b3abb7'
                        key: {
                            web_service_operation: 'b66867a44ee2421096019ea9cef10e02'
                            web_service_query_parameter: '1bd4a04623e7497e9e6c983de94d3ae1'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6aa861fe814841c38ae2e5e69bfbac16'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_type'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6cf770b2db464d2bb3adf638c5036e70'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'payment_status'
                        }
                    },
                    {
                        table: 'sys_ws_query_parameter_map'
                        id: '6d1e92669d7f42ec8c800aa942fdd7e3'
                        key: {
                            web_service_operation: 'b66867a44ee2421096019ea9cef10e02'
                            web_service_query_parameter: '2882efaac68f48d48094f986c5040beb'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6e2c882c92ad48bd840419b14151d9bf'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '70a3665676a94c53ababe4af6e125df2'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'customer_phone'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7179abe2494c4669b34d7b3f12a91b41'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'amenity_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7192038b20704f41a3439d7931f97a85'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'staff_member'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '75ae1a67c3c541219a92b9d29da4950d'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'location'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7868e3a6f0aa49189fdbe49b6c8ca025'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'last_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7b5c4c6108f142c6b7f925430dd45539'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'department'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7ca32396c1de436ba6cb5d5508ff3a1d'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'emergency_contact_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d85fae3673d4c3888e1cec5f3929176'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'is_available'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d9726c1c95e46199bbaed2ddfdeb4c4'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'capacity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7e7ad12536af4a8b83f6c4016513af61'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'payment_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8a0a4bc5d9f9439da8a210cd3d3dcda1'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'source'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8dd59b8665ee425fbc22af8bf23ae722'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8faef924d27c4f1f8818950f75a4b290'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'last_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9059077d2ded4795b0d730942c5cb2ab'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '90a91fb561a64f09887b5d433cdc9420'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'phone'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '934f31a74f14458b95ee49ed9ca04e64'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'comment_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9bad235032564ef28bd0e8682133f8dc'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'position'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ws_query_parameter_map'
                        id: '9c161ad08ece4d4a8a358a28b16961c0'
                        key: {
                            web_service_operation: '9f319d675ef2436f9b0f26547fb9ab9d'
                            web_service_query_parameter: '1c90fd604d5540ee86ab133de0c065d6'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d23129bbd694a58b1027c745c27d143'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'end_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9dd4faede4774f16b8ca5d0cfd2ed05f'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'source'
                            value: 'mobile_app'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9fe31623eb2f44f5927c09e72c165273'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'source'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a4ad3b33c6a64f30864ce293f8e0de6d'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'author_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a575dfdf972f45d8be32d369ccdaff19'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a5973720a65c40ff8e72e2c62f83761f'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'is_public'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a680a4d0733b47f7aed723c776fbd38d'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a705f7b744be41a8be2565504deeeb50'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'amenity_type'
                            value: 'golf_course'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a81536bc951b4993986fe13f0770504e'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'customer_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'adffc0463f5f480392f37108d68eeb7c'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'total_cost'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ae3e1c30328e4cc9a9e22e14472ba626'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'payment_status'
                            value: 'refunded'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b18141ee5aac437ea5c97ed11fe60166'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'maintenance_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b6be94a1cb8d46f39fb1d698ad018b08'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'amenity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b70d92bd38c946048a426771af69a962'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'phone'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ba36330aa5904b9cb1d3c10c36d7fa36'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'amenity_type'
                            value: 'walking_track'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bcd5f1041c7d439b9807f1356080ab4b'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'customer_email'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bd66e90fea87448f9eb15f505834531b'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'amenity_type'
                            value: 'football_ground'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bdd02fbc19cd4cd39cdd86612c7a2765'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'author_email'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c0a1612c61c54d2f81500c8b098ec2a9'
                        key: {
                            name: 'x_466904_recreatio_staff'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c14bf5d78c5c4d41bd244cf2ac333542'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'hourly_rate'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c2289cabea95404fab49076c8426da87'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'department'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c279e4f5df04436a9fcd2abbcf8dadd9'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'hourly_rate'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c2a0fe9afc044eb69d7b038def0503b6'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'amenity_type'
                            value: 'cricket_ground'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c42edd3189114d7eb9b66bedaf41eab2'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'staff_member'
                        }
                    },
                    {
                        table: 'sys_ws_query_parameter_map'
                        id: 'c5cde0066f23486380cb5b946e4c6f58'
                        key: {
                            web_service_operation: 'b66867a44ee2421096019ea9cef10e02'
                            web_service_query_parameter: '30e0e99beb8647578cd25cdc0e7a8607'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c65eefb4ea314c0c84ef4401cbdc924e'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'position'
                            value: 'attendant'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c79c813558814edaa44fc0d053800cb7'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'is_available'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c97b3a3de0d247e195d407687f0ff61d'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'department'
                            value: 'customer_service'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c9b5e974b50c47708aa3451779408e62'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'emergency_contact_name'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'cc60f414bab04410b552a437a0067dd4'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'position'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cdffaa8e1c6f4f32ad731cc861694c09'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'source'
                            value: 'phone_call'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cfef99b84eba4433a260255d7d209adb'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'hire_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cff08ff62d2f42549af491bd59840a8d'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'position'
                            value: 'maintenance'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd116d8e3f7624bbb9a9cedd3816e5e89'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'capacity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd160b9e986a14b748c004d5cf87dd473'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'department'
                            value: 'administration'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd21c72c2ee9b437280955ce4832df015'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'amenity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd2cf3bd06ca54fc291255b9ff2262b9b'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'comment_type'
                            value: 'general'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd4d875245f504a349e78b9d4ca8b5a68'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'shift_start'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd8036b8d9954455c893107882301ec71'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd9d2aa0fc9904bc1b239403cb4002191'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_status'
                            value: 'confirmed'
                        }
                    },
                    {
                        table: 'sys_ws_query_parameter_map'
                        id: 'dbb1013f44fe44129e3490105f8ad4c5'
                        key: {
                            web_service_operation: 'b66867a44ee2421096019ea9cef10e02'
                            web_service_query_parameter: '5b10f777790a49d9a4d9415bb9217570'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'dc5154e05b1b4dfebe0ac37449a4695b'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'df846949d4e54f79ad80a082dd124c26'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'staff_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e02754b106754184bf726d98d2927c53'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'booking_slot'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e1e92b42172240808be358af32bc4373'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'emergency_contact_phone'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e38fae071c474ccc8c74d5a385e7b58c'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'first_name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e50b09920909472e9454b7ff61cf5c0a'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'amenity_type'
                            value: 'shuttle_court'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e6e4e22d3be54cbab4b8e7147f439eed'
                        key: {
                            name: 'x_466904_recreatio_amenities'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e831099397d64d988d927907ef9afc5d'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'source'
                            value: 'web_portal'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e9e84aa6a8be446ca0115462f6e1593a'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'source'
                            value: 'external_api'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'eac87469336a4c37a4c3431cafed0cb6'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'position'
                            value: 'security'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ed6c8fcfc155443583351451994ea00f'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'first_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ws_query_parameter_map'
                        id: 'ef89aefa4f7c421b97c79892d6e8205a'
                        key: {
                            web_service_operation: '9f319d675ef2436f9b0f26547fb9ab9d'
                            web_service_query_parameter: 'ade3a091a0124e8892974385a0612693'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f21d9b8db1ec434fa0b46bfdbed1f8c8'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'source'
                            value: 'walk_in'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'f225c2c7f09647ed8624156244380a47'
                        key: {
                            name: 'x_466904_recreatio_comments'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f2f993439bf64ed298485eeffbdd6e70'
                        key: {
                            name: 'x_466904_recreatio_staff'
                            element: 'department'
                            value: 'maintenance'
                        }
                    },
                    {
                        table: 'sys_ws_query_parameter_map'
                        id: 'f4ea75fc86164baeba53a96f6979e704'
                        key: {
                            web_service_operation: '9f319d675ef2436f9b0f26547fb9ab9d'
                            web_service_query_parameter: '42574abf8e3843cd9006adf3c4f63e56'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f54ec10c14264f4b8932ac86248a4701'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'payment_status'
                            value: 'paid'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f6ac9004461d4bdb86fd1de99f1050bd'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'is_public'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f817d10a14e04664b32085a161a4ca35'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booked_by_staff'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f829b2fea9574551995a76cae09d1cda'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'author_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fad2cd4e7bb245ecadb2e849394025c2'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'end_time'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fc48a87443e2437d917e0e8d32b51616'
                        key: {
                            name: 'x_466904_recreatio_comments'
                            element: 'comment_type'
                            value: 'customer_feedback'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'fe4ff052973b4b24bb4259771e50ce38'
                        key: {
                            name: 'x_466904_recreatio_comments'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fe652c438cad4c9aab3149f9e68064ca'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'customer_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'feae18858eb247f690454cd61ea6ac43'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'start_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fec962d1e9e24cec912c66c6102689e8'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'booking_status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ff7a64fe2fbc4ea58bf9d9566c4d01b7'
                        key: {
                            name: 'x_466904_recreatio_booking_slots'
                            element: 'additional_comments'
                        }
                    },
                ]
            }
        }
    }
}
