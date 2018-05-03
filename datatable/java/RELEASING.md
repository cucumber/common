Releasing
=========

The deployment process of `datatables` is based on 
[Deploying to OSSRH with Apache Maven](http://central.sonatype.org/pages/apache-maven.html#deploying-to-ossrh-with-apache-maven-introduction).
This process is nearly identical for both snapshot deployments and releases. Whether a snapshot 
deployment or release is executed is determined by the version number.

To make a release you must have the `devs@cucumber.io` GPG private key imported in gpg2.

```
gpg --import devs-cucumber.io.key
```

Additionally upload privileges to the Sonatype repositories are required. See the 
[OSSRH Guide](http://central.sonatype.org/pages/ossrh-guide.html) for instructions. Then an 
administrator will have to grant you access to the cucumber repository.

Finally both your OSSRH credentials and private key must be setup in your `~/.m2/settings.xml` - 
for example:

```
<settings>
    <servers>
        <server>
            <id>ossrh</id>
            <username>sonatype-user-name</username>
            <password>sonatype-password</password>
        </server>
    </servers>
    <profiles>
        <profile>
            <id>ossrh</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <gpg.executable>gpg2</gpg.executable>
                <gpg.useagent>true</gpg.useagent>
            </properties>
        </profile>
        <profile>
            <id>sign-with-cucumber-key</id>
            <properties>
                <gpg.keyname>dev-cucumber.io-key-id</gpg.keyname>
            </properties>
        </profile>
    </profiles>
</settings>
```


# Make and deploy the release #

```
mvn release:clean release:prepare -DautoVersionSubmodules=true -DpushChanges=false -Darguments="-DskipTests=true" 
mvn release:perform -Psign-source-javadoc -DskipTests=true
git push
git push --tags
```
