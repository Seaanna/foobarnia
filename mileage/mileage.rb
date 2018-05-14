require 'csv'
require './auto_seeker'
require 'pry'

# this script returns median mileage based on filter arguments
# argument 0 should be filter type
# argument 1 should be filter value

data = CSV.read('foobarnian_autos.csv')
# remove first line of csv because it holds the attribute names, not values
data.delete_at(0)

# check first argument for filter type
unless ["color", "fuel", "price"].include? ARGV[0]
  abort "You did not pass in the correct argument. #{ARGV[0]} must be color, fuel, or price."
end

seeker = AutoSeeker.new data
autos = seeker.filter(ARGV[0], ARGV[1], ARGV[2])

if autos.length == 0
  abort "no autos found."
end

mileage = AutoSeeker.median_mileage(autos)

puts "median mileage = #{mileage} MPG"
