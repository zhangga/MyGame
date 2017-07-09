package p.my.common.support;

import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.Security;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;

public final class SecureChatSslContextFactory {
	
	private static final String PROTOCOL = "TLS";
	
	private static final SSLContext SERVER_CONTEXT;
	
	private static final SSLContext CLIENT_CONTEXT;
	
	private static final String KEYSTORE_FILE = "tomcat.jks";
	
	private static final String TRUSTSTORE_FILE = "tomcat.jks";
	
	private static final String KEYSTOREPASS = "1q2w3e4r5t";
	
	private static final String TRUSTSTOREPASS = "1q2w3e4r5t";
	
	static {
		String algorithm = Security.getProperty("ssl.KeyManagerFactory.algorithm");
		if (algorithm == null) {
			algorithm = "SunX509";
		}
		SSLContext serverContext, clientContext;
		//服务器端
		try {
			KeyStore ks = KeyStore.getInstance("JKS");
			ks.load(new FileInputStream(KEYSTORE_FILE), KEYSTOREPASS.toCharArray());
			KeyManagerFactory kmf = KeyManagerFactory.getInstance(algorithm);
			kmf.init(ks, KEYSTOREPASS.toCharArray());
			KeyStore ts = KeyStore.getInstance("JKS");
			ts.load(new FileInputStream(TRUSTSTORE_FILE), TRUSTSTOREPASS.toCharArray());
			TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
			tmf.init(ts);
			//Initialize the SSLContext to work with our key managers.
			serverContext = SSLContext.getInstance(PROTOCOL);
			serverContext.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);
		} catch (Exception e) {
			throw new Error("Failed to initialize the server-side SSLContext", e);
		}
		//客户端
		try {
			KeyStore ks = KeyStore.getInstance("JKS");
			ks.load(new FileInputStream(KEYSTORE_FILE), KEYSTOREPASS.toCharArray());
			KeyManagerFactory kmf = KeyManagerFactory.getInstance(algorithm);
			kmf.init(ks, KEYSTOREPASS.toCharArray());
			KeyStore ts = KeyStore.getInstance("JKS");
			ts.load(new FileInputStream(TRUSTSTORE_FILE), TRUSTSTOREPASS.toCharArray());
			TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
			tmf.init(ts);
			//Initialize the SSLContext to work with our key managers.
			clientContext = SSLContext.getInstance(PROTOCOL);
			clientContext.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);
		} catch (Exception e) {
			throw new Error("Failed to initialize the client-side SSLContext", e);
		}
		SERVER_CONTEXT = serverContext;
		CLIENT_CONTEXT = clientContext;
	}
	
	public static SSLContext getServerContext() {
		return SERVER_CONTEXT;
	}
	
	public static SSLContext getClientContext() {
		return CLIENT_CONTEXT;
	}
	
	private SecureChatSslContextFactory() {
	}

}
