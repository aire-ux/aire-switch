package io.sunshower.aire.ux.controls;

import static com.vaadin.flow.component.PropertyDescriptors.propertyWithDefault;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.PropertyDescriptor;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.shared.Registration;
import java.util.Locale;
import lombok.val;

@Tag("aire-switch")
@JsModule(Paths.Switch_SOURCE)
@CssImport(Paths.Switch_STYLES)
/** uncomment this if you have deployed this component into NPMJS */
@NpmPackage(value = "@aire-ux/aire-switch", version = Versions.Switch_VERSION)
public class Switch extends Component {

  static final PropertyDescriptor<String, String> MODE_PROPERTY_DESCRIPTOR;
  static final PropertyDescriptor<String, String> LABEL_PROPERTY_DESCRIPTOR;

  static final PropertyDescriptor<String, String> DIRECTION_PROPERTY_DESCRIPTOR;

  static {
    MODE_PROPERTY_DESCRIPTOR = propertyWithDefault("mode", propertyValue(Mode.On));

    DIRECTION_PROPERTY_DESCRIPTOR =
        propertyWithDefault("direction", propertyValue(Direction.Horizontal));

    LABEL_PROPERTY_DESCRIPTOR = propertyWithDefault("label", "");
  }

  public Switch() {
    this("");
  }

  public Switch(String label) {
    this(new Text(label));
  }

  public Switch(Component label) {
    getElement().appendChild(label.getElement());
    setMode(Mode.On);
  }

  static String propertyValue(Enum<?> e) {
    return e.name().toLowerCase(Locale.ROOT);
  }

  static <T extends Enum<T>> T parse(Class<T> e, T defaultValue, String value) {
    val constants = e.getEnumConstants();
    for (val constant : constants) {
      if (constant.name().equalsIgnoreCase(value)) {
        return constant;
      }
    }
    return defaultValue;
  }

  public Registration addSelectionChangeListener(
      ComponentEventListener<SwitchStateChangedEvent> listener) {
    return addListener(SwitchStateChangedEvent.class, listener);
  }

  public Direction getDirection() {
    return parse(Direction.class, Direction.Horizontal, get(DIRECTION_PROPERTY_DESCRIPTOR));
  }

  public void setDirection(Direction direction) {
    set(DIRECTION_PROPERTY_DESCRIPTOR, propertyValue(direction));
  }

  public Mode getMode() {
    return parse(Mode.class, Mode.On, get(MODE_PROPERTY_DESCRIPTOR));
  }

  public void setMode(Mode mode) {
    set(MODE_PROPERTY_DESCRIPTOR, propertyValue(mode));
  }

  public boolean isSelected() {
    return getMode() == Mode.On;
  }

  public void setSelected(boolean selected) {
    if (selected) {
      setMode(Mode.On);
    } else {
      setMode(Mode.Off);
    }
  }

  public enum Mode {
    On,
    Off,
    Indeterminate
  }

  public enum Direction {
    Vertical,
    Horizontal;
  }
}
