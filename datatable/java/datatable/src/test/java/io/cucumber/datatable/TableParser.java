package io.cucumber.datatable;

import com.google.common.base.Joiner;
import io.cucumber.gherkin.Gherkin;
import io.cucumber.messages.Messages;

import java.util.Iterator;

import static io.cucumber.datatable.PickleTableConverter.toTable;
import static java.util.Collections.singletonList;

class TableParser {

    private TableParser() {
    }


    static DataTable parse(String... source) {
        return parse(Joiner.on('\n').join(source));
    }

    static DataTable parse(String source) {
        Messages.Source sourceMessage = Messages.Source.newBuilder().setData(
                "Feature:\n" +
                        "  Scenario:\n" +
                        "    Given x\n" +
                        source
        ).build();

        Iterable<Messages.Envelope> envelopes = Gherkin.fromSources(
                singletonList(sourceMessage),
                false,
                false,
                true
        );

        //        List<Envelope> wrappers = toList();
        Iterator<Messages.Envelope> iterator = envelopes.iterator();
        if(!iterator.hasNext()) throw new RuntimeException("Expected one pickle envelope");
        Messages.Envelope envelope = iterator.next();
        Messages.PickleStepArgument.PickleTable pickleTable = envelope.getPickle().getSteps(0).getArgument().getDataTable();

        return DataTable.create(toTable(pickleTable));

    }

}
