from app import app
from flask import jsonify
import requests
from ura_api import ura_api


# initialise URA python wrapper
# Link: https://pypi.org/project/ura-api/
ura = ura_api.ura_api(app.config["URA_API_KEY"], app.config["URA_TOKEN"])

## Available APIs ##

# ## Car Parks
# car_pack_available_lots()
# car_pack_list_and_rates()
# season_car_pack_list_and_rates()

# ## Private Properties
# private_residential_property_transactions()
# private_non_landed_residential_properties_median_rentals_by_name()
# # Data are available for download by reference quarter. 
# # Period field is in format of yyqq e.g. 14q1 represents 2014 1st quarter. 
# private_residential_properties_rental_contract(period)
# # Data are available for download by reference quarter. 
# # Period field is in format of mmyy e.g. 0913 represents Sep 2013.
# private_residential_property_units_sold_by_developers(period)
# private_residential_projects_in_the_pipeline()

# ## Planning Decisions
# planning_decisions(year, last_dnload_date)

# ## Approved Use
# approved_residential_use(blkHouseNo, street, storeyNo, unitNo)

@app.route("/ura/")
def testUra():
    return "ura data application is working"

@app.route("/ura/car_park/availability")
def get_car_park_availability():
    try:
        return jsonify(ura.car_pack_available_lots()), 200

    except Exception as e:
        return jsonify(error=str(e)), 500
    

@app.route("/ura/car_park/list_and_rates")
def get_car_park_list_and_rates():
    try:
        return jsonify(ura.car_pack_list_and_rates()), 200

    except Exception as e:
        return jsonify(error=str(e)), 500


@app.route("/ura/private_properties/transactions")
def get_private_residential_property():

    try:
        return jsonify(ura.private_residential_property_transactions()), 200

    except Exception as e:
        return jsonify(error=str(e)), 500








