package com.chappelly.gym.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MaxProgressRecord {

    public static class WeightRecord {
        private String date;
        private Double weight;

        public WeightRecord(Date date, Double maxWeight) {
            this.date = date.toString();
            this.weight = maxWeight;
        }

        public String getDate() { return date; }
        public Double getWeight() { return weight; }
        public void setDate(String date) { this.date = date; }
        public void setWeight(Double weight) { this.weight = weight; }
    }

    private String name;
    private List<WeightRecord> weightRecords = new ArrayList<WeightRecord>();

    public MaxProgressRecord(String name) {
        this.name = name;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<WeightRecord> getWeightRecords() { return weightRecords; }
    public void setWeightRecords(List<WeightRecord> weightRecords) { this.weightRecords = weightRecords; }

    public void push(WeightRecord record) { weightRecords.add(record); }
}
