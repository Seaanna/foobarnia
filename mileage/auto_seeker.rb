require './auto'

class AutoSeeker

  def initialize data
    @data = data
  end

  def filter key, value1, value2 = nil
    @autos = autos.select do |auto|
      if key == "price"
        (auto.send(key).to_f >= value1.to_f) and (auto.send(key).to_f <= value2.to_f)
      else
        auto.send(key) == value1
      end
    end
  end

  def autos
    @autos ||= @data.map do |row|
      Auto.new(row)
    end
  end

  def self.median_mileage autos
    prices = autos.collect(&:mileage).compact.sort
    (prices[(prices.length - 1) / 2].to_f + prices[prices.length / 2].to_f) / 2.0
  end
end
