package io.cucumber.cucumberexpressions;

import java.util.Comparator;

/**
 * Compares parameter types according to preferred use
 */
class ParameterTypeComparator implements Comparator<ParameterType> {
    @Override
    public int compare(ParameterType pt1, ParameterType pt2) {
        if (pt1.isPreferential() && !pt2.isPreferential()) return -1;
        if (pt2.isPreferential() && !pt1.isPreferential()) return 1;
        return pt1.getName().compareTo(pt2.getName());
    }
}
